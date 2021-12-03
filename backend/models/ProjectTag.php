<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "project_tag".
 *
 * @property int $id
 * @property int $project_id
 * @property int $tag_id
 *
 * @property Project $project
 * @property Tag $tag
 */
class ProjectTag extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'project_tag';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['project_id', 'tag_id'], 'required'],
            [['project_id', 'tag_id'], 'default', 'value' => null],
            [['project_id', 'tag_id'], 'integer'],
            [['project_id'], 'exist', 'skipOnError' => true, 'targetClass' => Project::class, 'targetAttribute' => ['project_id' => 'id']],
            [['tag_id'], 'exist', 'skipOnError' => true, 'targetClass' => Tag::class, 'targetAttribute' => ['tag_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ИД',
            'project_id' => 'Проект',
            'tag_id' => 'Тег',
        ];
    }

    /**
     * Gets query for [[Project]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getProject()
    {
        return $this->hasOne(Project::class, ['id' => 'project_id']);
    }

    /**
     * Gets query for [[Tag]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getTag()
    {
        return $this->hasOne(Tag::class, ['id' => 'tag_id']);
    }
    /**
     * Удалить все теги проекта
     * @param Project $project проект
     * @return int
     */
    public static function deleteAllByProject(Project $project) {
        return self::deleteAll(['project_id' => $project->id]);
    }
    
    /**
     * Добавляет тег к проекту
     * @param Project $project Проект
     * @param Tag $tag Тег
     * @return ProjectTag
     */
    public static function addToProject(Project $project, Tag $tag): ProjectTag {
        $model = self::findOne(['project_id' => $project->id, 'tag_id' => $tag->id]);
        if(!$model) {
            $model = new ProjectTag();
            $model->project_id = $project->id;
            $model->tag_id = $tag->id;
            $model->save();
        }
        return $model;
    }
}
