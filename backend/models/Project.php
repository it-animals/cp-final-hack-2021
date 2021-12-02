<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "project".
 *
 * @property int $id
 * @property string $name
 * @property string $descr
 * @property string|null $tags
 * @property int $status
 * @property int $type
 * @property int $for_transport
 * @property int $certification
 * @property float $budget
 * @property string $date_start
 * @property string $date_end
 * @property float|null $mark_ready
 * @property float|null $mark_idea
 * @property float|null $mark_finance
 * @property float|null $mark_pilot
 * @property int|null $mark_success
 *
 * @property ProjectFile[] $projectFiles
 * @property ProjectPilot[] $projectPilots
 * @property ProjectReview[] $projectReviews
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
            [['name', 'descr', 'status', 'type', 'for_transport', 'certification', 'budget', 'date_start', 'date_end'], 'required'],
            [['descr'], 'string'],
            [['tags', 'date_start', 'date_end'], 'safe'],
            [['status', 'type', 'for_transport', 'certification', 'mark_success'], 'default', 'value' => null],
            [['status', 'type', 'for_transport', 'certification', 'mark_success'], 'integer'],
            [['budget', 'mark_ready', 'mark_idea', 'mark_finance', 'mark_pilot'], 'number'],
            [['name'], 'string', 'max' => 1000],
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
            'tags' => 'Tags',
            'status' => 'Status',
            'type' => 'Type',
            'for_transport' => 'For Transport',
            'certification' => 'Certification',
            'budget' => 'Budget',
            'date_start' => 'Date Start',
            'date_end' => 'Date End',
            'mark_ready' => 'Mark Ready',
            'mark_idea' => 'Mark Idea',
            'mark_finance' => 'Mark Finance',
            'mark_pilot' => 'Mark Pilot',
            'mark_success' => 'Mark Success',
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
     * Gets query for [[ProjectPilots]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getProjectPilots()
    {
        return $this->hasMany(ProjectPilot::className(), ['project_id' => 'id']);
    }

    /**
     * Gets query for [[ProjectReviews]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getProjectReviews()
    {
        return $this->hasMany(ProjectReview::className(), ['project_id' => 'id']);
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
