<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "project_pilot".
 *
 * @property int $id
 * @property int $project_id
 * @property string $name
 * @property int $mark
 * @property string $comment
 *
 * @property Project $project
 */
class ProjectPilot extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'project_pilot';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['project_id', 'name', 'mark', 'comment'], 'required'],
            [['project_id', 'mark'], 'default', 'value' => null],
            [['project_id', 'mark'], 'integer'],
            [['comment'], 'string'],
            [['name'], 'string', 'max' => 200],
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
            'mark' => 'Mark',
            'comment' => 'Comment',
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
