<?php

namespace app\models;

use yii\db\ActiveQuery;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "user".
 *
 * @property int $id
 * @property string $email
 * @property string $fio
 * @property string|null $avatar
 * @property int $role
 * @property string|null $password
 *
 * @property Team[] $teams
 */
class User extends ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'user';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['email', 'fio', 'role'], 'required'],
            [['role'], 'default', 'value' => null],
            [['role'], 'integer'],
            [['avatar'], 'string'],
            [['email', 'password'], 'string', 'max' => 1000],
            [['fio'], 'string', 'max' => 100],
            [['email'], 'unique'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'email' => 'Email',
            'fio' => 'Fio',
            'avatar' => 'Avatar',
            'role' => 'Role',
            'password' => 'Password',
        ];
    }

    /**
     * Gets query for [[Teams]].
     *
     * @return ActiveQuery
     */
    public function getTeams()
    {
        return $this->hasMany(Team::class, ['user_id' => 'id']);
    }
}
