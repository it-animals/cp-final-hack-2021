<?php

namespace app\modules\v1\controllers;

use app\models\LoginForm;
use app\models\User;
use app\modules\v1\helpers\BehaviorHelper;
use app\modules\v1\traits\GetUserTrait;
use app\modules\v1\traits\OptionsActionTrait;
use Yii;
use yii\rest\Controller;
use yii\web\BadRequestHttpException;
use yii\web\ForbiddenHttpException;
use function mb_strtolower;
use function trim;

class UserController extends Controller
{
    use OptionsActionTrait, GetUserTrait;

    public function behaviors()
    {
        return BehaviorHelper::api(parent::behaviors(), [
            'POST' => [
                BehaviorHelper::AUTH_NOT_REQUIRED => ['login', 'register'],
            ],
            'GET' => [
                BehaviorHelper::AUTH_REQUIRED => ['info'],
            ],
        ]);
    }

    public function actionRegister()
    {
        $request = Yii::$app->request;

        $user = new User();
        $user->fio = $request->getBodyParam('fio');
        $user->password = Yii::$app->security->generatePasswordHash($request->getBodyParam('password'));
        $user->email = trim(mb_strtolower($request->getBodyParam('email'), 'UTF-8'));
        $user->role = $request->getBodyParam('role');

        if (!$user->save()) {
            throw new BadRequestHttpException($user->getErrorSummary(false)[0]);
        }
        return [
            'user' => [
                'email' => $user->email,
            ]
        ];
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