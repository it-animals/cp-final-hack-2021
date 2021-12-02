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
            [['name', 'extension'], 'string', 'max' => 1000],
            [['project_id'], 'exist', 'skipOnError' => true, 'targetClass' => Project::className(), 'targetAttribute' => ['project_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'project_id' => 'Project ID',
            'name' => 'Name',
            'extension' => 'Extension',
        ];
    }

    /**
     * Gets query for [[Project]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getProject()
    {
        return $this->hasOne(Project::className(), ['id' => 'project_id']);
    }
}