<?php

namespace app\modules\v1\traits;

use app\models\User;
use Yii;
use yii\web\ForbiddenHttpException;

trait GetUserTrait
{
    /**
     * @return User
     * @throws ForbiddenHttpException
     */
    private function getUser(): User
    {
        /* @var $user User|null */
        $user = Yii::$app->user->identity->getUser();
        if (!$user) {
            throw new ForbiddenHttpException('Пользователь не авторизован.');
        }
        return $user;
    }
}
