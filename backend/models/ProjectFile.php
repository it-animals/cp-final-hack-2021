<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "project_file".
 *
 * @property int $id
 * @property int $project_id
 * @property string|null $name
 * @property string|null $extension
 * @property string|null $content
 *
 * @property Project $project
 */
class ProjectFile extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'project_file';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['project_id'], 'required'],
            [['project_id'], 'default', 'value' => null],
            [['project_id'], 'integer'],
            [['content'], 'string'],
            [['name', 'extension'], 'string', 'max' => 1000],
            [['project_id'], 'exist', 'skipOnError' => true, 'targetClass' => Project::class, 'targetAttribute' => ['project_id' => 'id']],
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
            'name' => 'Наименование',
            'extension' => 'Расширение',
            'content' => 'Content',
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
}
