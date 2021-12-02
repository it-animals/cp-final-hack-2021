<?php

namespace app\models;

use app\services\JwtService;
use Yii;
use yii\web\IdentityInterface;

/**
 * Идентификатор пользователя для процедуры авторизации
 */
class UserIdentity implements IdentityInterface
{
    /**
     * @var User
     */
    private User $user;

    /**
     * UserIdentity constructor.
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * @return User
     */
    public function getUser(): User
    {
        return $this->user;
    }

    /**
     * Найти идентификатор пользователя по ИД
     * @param int $id ИД пользователя
     * @return UserIdentity|null
     */
    public static function findIdentity($id): ?UserIdentity
    {
        $user = User::findOne(['id' => $id]);
        return $user ? new self($user) : null;
    }

    /**
     * @param string $username
     * @return UserIdentity|null
     */
    public static function findByUsername(string $username): ?UserIdentity
    {
        $user = User::findOne(['email' => $username]);
        return $user ? new self($user) : null;
    }

    /**
     * @param $token
     * @param null $type
     * @return UserIdentity|null
     */
    public static function findIdentityByAccessToken($token, $type = null): ?UserIdentity
    {
        /*$user = User::findOne(['access_token' => $token]);
        if ($user && $user->access_token_unixtime > time() + Yii::$app->params['tokenLive']) {
            $user = null;
        }
        return $user ? new self($user) : null;*/
        $jwt = Yii::$container->get(JwtService::class);
        return $jwt->identityByJwtToken($token);
    }

    /**
     * Получить идентификатор пользователя
     * @return int|null
     */
    public function getId(): ?int
    {
        return $this->user ? $this->user->id : null;
    }

    /**
     * Получить имя пользователя
     * @return string|null
     */
    public function getUsername(): ?string
    {
        return $this->user ? $this->user->email : null;
    }

    /**
     * @return string|null
     */
    public function getAuthKey(): ?string
    {
        //@todo добавить поле в пользователя
        return null;
    }

    /**
     * @param $authKey
     * @return bool
     */
    public function validateAuthKey($authKey): bool
    {
        //@todo добавить поле в пользователя
        return false;
    }

    /**
     * Проверка корректности пароля
     * @param string $password пароль
     * @return bool
     */
    public function validatePassword(string $password): bool
    {
        return Yii::$app->security->validatePassword($password, $this->user->password);
    }

}
