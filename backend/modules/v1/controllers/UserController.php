<?php

namespace app\modules\v1\controllers;

use app\models\LoginForm;
use app\modules\v1\helpers\BehaviorHelper;
use app\modules\v1\traits\GetUserTrait;
use app\modules\v1\traits\OptionsActionTrait;
use Yii;
use yii\rest\Controller;
use yii\web\ForbiddenHttpException;

class UserController extends Controller
{
    use OptionsActionTrait, GetUserTrait;

    public function behaviors()
    {
        return BehaviorHelper::api(parent::behaviors(), [
            'POST' => [
                BehaviorHelper::AUTH_NOT_REQUIRED => ['login'],
            ],
            'GET' => [
                BehaviorHelper::AUTH_REQUIRED => ['info'],
            ],
        ]);
    }

    public function actionLogin()
    {
        $request = Yii::$app->request;

        $form = new LoginForm();
        $form->username = $request->getBodyParam('email');
        $form->password = $request->getBodyParam('password');

        if (!$form->login()) {
            throw new ForbiddenHttpException("Вы ввели неверный адрес электронной почты или пароль.");
        }
        return [
            'jwt' => $form->jwt,
        ];
    }

    public function actionInfo()
    {
        $user = $this->getUser();
        return [
            'user' => $user->toArray(['id', 'email', 'fio', 'role']),
        ];
    }
}