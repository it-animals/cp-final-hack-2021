<?php

namespace app\models;

use Yii;
use app\models\Project;
use app\models\User;

/**
 * This is the model class for table "team".
 *
 * @property int $id
 * @property int $project_id
 * @property int $user_id
 * @property bool $is_owner
 *
 * @property Project $project
 * @property User $user
 */
class Team extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'team';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['project_id', 'user_id', 'is_owner'], 'required'],
            [['project_id', 'user_id'], 'default', 'value' => null],
            [['project_id', 'user_id'], 'integer'],
            [['is_owner'], 'boolean'],
            [['project_id'], 'exist', 'skipOnError' => true, 'targetClass' => Project::class, 'targetAttribute' => ['project_id' => 'id']],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::class, 'targetAttribute' => ['user_id' => 'id']],
            [['project_id', 'user_id'], 'unique', 'targetAttribute' => ['project_id', 'user_id']],
            [['project_id', 'is_owner'], 'unique', 'targetAttribute' => ['project_id', 'is_owner']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'Код',
            'project_id' => 'Проект',
            'user_id' => 'Участник',
            'is_owner' => 'Владелец',
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
     * Gets query for [[User]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getUser()
    {
        return $this->hasOne(User::class, ['id' => 'user_id']);
    }
    
    public static function addOwner(Project $project, User $user) {
        if(!self::findOne(['project_id' => $project->id, 'user_id' => $user->id])) {
            $model = new Team();
            $model->project_id = $project->id;
            $model->user_id = $user->id;
            $model->is_owner = true;
            $model->save();
        }        
    }
}
