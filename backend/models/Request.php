<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "request".
 *
 * @property int $id
 * @property int $user_id
 * @property string $name
 * @property string|null $descr
 * @property project_id integer
 *
 * @property RequestTag[] $requestTags
 * @property Project $project
 * @property User $user
 */
class Request extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'request';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['user_id', 'name'], 'required'],
            [['user_id'], 'default', 'value' => null],
            [['user_id', 'project_id'], 'integer'],
            [['descr'], 'string'],
            [['name'], 'string', 'max' => 200],
            [['project_id'], 'exist', 'skipOnError' => true, 'targetClass' => Project::class, 'targetAttribute' => ['project_id' => 'id']],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::class, 'targetAttribute' => ['user_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'Код',
            'user_id' => 'Автор',
            'name' => 'Наименование',
            'descr' => 'Описание',
            'project_id' => 'Проект'
        ];
    }

    /**
     * Gets query for [[RequestTags]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getRequestTags()
    {
        return $this->hasMany(RequestTag::class, ['request_id' => 'id']);
    }

    /**
     * Gets query for [[User]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getUser()
    {
        return $this->hasOne(User::className(), ['id' => 'user_id']);
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
