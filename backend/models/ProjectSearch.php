<?php

namespace app\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\Project;
use app\models\ProjectFile;

/**
 * ProjectSearch represents the model behind the search form of `app\models\Project`.
 */
class ProjectSearch extends Project
{
    public $search;
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id', 'status', 'type', 'for_transport', 'certification'], 'integer'],
            [['name', 'descr', 'cases', 'profit', 'search'], 'safe'],
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
            $query->andWhere("to_tsvector(name || ' ' ||descr || ' ' || cases || ' ' || profit) @@ plainto_tsquery(:search)", [":search" => $this->search]);
            $subQuery = ProjectFile::find()->select('project_id')->andWhere("to_tsvector(content) @@ plainto_tsquery(:search)", [":search" => $this->search]);
            $query->orWhere(['in', 'id', $subQuery]);
            $query->orderBy("ts_rank(to_tsvector(name || ' ' ||descr || ' ' || cases || ' ' || profit), plainto_tsquery(:search)) DESC");            
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
