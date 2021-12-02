<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "project".
 *
 * @property int $id
 * @property string $name
 * @property string|null $descr
 * @property string|null $cases
 * @property string|null $profit
 * @property int $status
 * @property int $type
 * @property int $for_transport
 * @property int $certification
 *
 * @property ProjectFile[] $projectFiles
 * @property ProjectTag[] $projectTags
 * @property Team[] $teams
 */
class Project extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'project';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name', 'status', 'type', 'for_transport', 'certification'], 'required'],
            [['descr', 'cases', 'profit'], 'string'],
            [['status', 'type', 'for_transport', 'certification'], 'default', 'value' => null],
            [['status', 'type', 'for_transport', 'certification'], 'integer'],
            [['name'], 'string', 'max' => 200],
            [['name'], 'unique'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'descr' => 'Descr',
            'cases' => 'Cases',
            'profit' => 'Profit',
            'status' => 'Status',
            'type' => 'Type',
            'for_transport' => 'For Transport',
            'certification' => 'Certification',
        ];
    }

    /**
     * Gets query for [[ProjectFiles]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getProjectFiles()
    {
        return $this->hasMany(ProjectFile::className(), ['project_id' => 'id']);
    }

    /**
     * Gets query for [[ProjectTags]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getProjectTags()
    {
        return $this->hasMany(ProjectTag::className(), ['project_id' => 'id']);
    }

    /**
     * Gets query for [[Teams]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getTeams()
    {
        return $this->hasMany(Team::className(), ['project_id' => 'id']);
    }
}
