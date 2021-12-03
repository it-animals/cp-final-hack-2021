<?php

namespace app\models;

use yii\base\Model;
use app\models\Tag;
use app\models\ProjectTag;
use yii\data\ActiveDataProvider;
use app\models\Project;
use app\models\ProjectFile;
use function array_keys;
use function is_array;

/**
 * ProjectSearch represents the model behind the search form of `app\models\Project`.
 */
class ProjectSearch extends Project
{
    public $search;
    public $tags = null;
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id', 'status', 'type', 'for_transport', 'certification'], 'integer'],
            [['name', 'descr', 'cases', 'profit', 'search', 'tags'], 'safe'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params)
    {
        $query = Project::find();

        // add conditions that should always apply here

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        $this->load($params);

        if (!$this->validate()) {
            // uncomment the following line if you do not want to return any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }
        if($this->search) {            
            //поиск FTS по основным полям карточки
            $query->andWhere("to_tsvector(name || ' ' ||descr || ' ' || cases || ' ' || profit) @@ plainto_tsquery(:search)", [":search" => $this->search]);
            
            //поиск FTS по контенту файлов
            $fileQuery = ProjectFile::find()->select('project_id')->andWhere("to_tsvector(content) @@ plainto_tsquery(:search)", [":search" => $this->search]);
            $query->orWhere(['in', 'id', $fileQuery]);
            
            //поиск по тегам            
            $tags = Tag::findAllInRequest($this->search);
            if($tags) {
                $ids = array_map(function(Tag $tag) {return $tag->id;}, $tags);
                $tagQuery = ProjectTag::find()->select('project_id')->andWhere(['in', 'tag_id', $ids]);
                $query->orWhere(['in', 'id', $tagQuery]);
            }
            
            $query->orderBy("ts_rank(to_tsvector(name || ' ' ||descr || ' ' || cases || ' ' || profit), plainto_tsquery(:search)) DESC");
        }

        if ($this->tags && is_array($this->tags)) {
            $tagQuery = ProjectTag::find()->select('project_id')->andWhere(['in', 'tag_id', $this->tags]);
            $query->andWhere(['in', 'id', $tagQuery]);
        }

        // grid filtering conditions
        $query->andFilterWhere([
            'id' => $this->id,
            'status' => $this->status,
            'type' => $this->type,
            'for_transport' => $this->for_transport,
            'certification' => $this->certification,
        ]);

        $query->andFilterWhere(['ilike', 'name', $this->name])
            ->andFilterWhere(['ilike', 'descr', $this->descr])
            ->andFilterWhere(['ilike', 'cases', $this->cases])
            ->andFilterWhere(['ilike', 'profit', $this->profit]);

        return $dataProvider;
    }
}
