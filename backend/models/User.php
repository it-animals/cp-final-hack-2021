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
     * Администратор
     */
    const ROLE_ADMIN = 1;
    /**
     * Представитель организаций транспорта Москвы
     */
    const ROLE_MT = 2;
    /**
     * Участник
     */
    const ROLE_USER = 3;
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
        $roles = self::getRoleList();
        return [
            [['email', 'fio', 'role'], 'required'],
            [['role'], 'default', 'value' => null],
            [['role'], 'integer'],
            [['role'], 'in', 'range' => array_keys($roles)],
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
            'id' => 'ИД',
            'email' => 'Email',
            'fio' => 'ФИО',
            'avatar' => 'Аватар',
            'role' => 'Роль',
            'password' => 'Пароль',
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
    
    public static function getRoleList(): array {
        return [
            self::ROLE_ADMIN => 'Администратор',
            self::ROLE_MT => 'Представитель транспорта Москвы',
            self::ROLE_USER => 'Участник'
        ];
    }
}
