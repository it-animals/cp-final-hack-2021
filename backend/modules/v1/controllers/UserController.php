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

/**
 * @OA\Tag(
 *   name="User"
 * )
 */
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

    /**
     * @OA\Post(
     *   tags={"User"},
     *   path="/v1/user/register",
     *   summary="",
     *   @OA\RequestBody(
     *     @OA\MediaType(
     *       mediaType="multipart/form-data",
     *       @OA\Schema(
     *         required={"fio", "password", "email", "role"},
     *         @OA\Property(
     *           property="fio",
     *           type="string",
     *           description="",
     *         ),
     *         @OA\Property(
     *           property="email",
     *           type="string",
     *           description="",
     *         ),
     *         @OA\Property(
     *           property="password",
     *           type="string",
     *           description="",
     *         ),
     *         @OA\Property(
     *           property="role",
     *           type="integer",
     *           description="",
     *         ),
     *       ),
     *     ),
     *   ),
     *   @OA\Response(
     *     response=200,
     *     description=""
     *   )
     * )
     */
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

    /**
     * @OA\Post(
     *   tags={"User"},
     *   path="/v1/user/login",
     *   summary="",
     *   @OA\RequestBody(
     *     @OA\MediaType(
     *       mediaType="multipart/form-data",
     *       @OA\Schema(
     *         required={"email", "password"},
     *         @OA\Property(
     *           property="email",
     *           type="string",
     *           description="",
     *         ),
     *         @OA\Property(
     *           property="password",
     *           type="string",
     *           description="",
     *         ),
     *       ),
     *     ),
     *   ),
     *   @OA\Response(
     *     response=200,
     *     description=""
     *   ),
     * ),
     */
    public function actionLogin()
    {
        $request = Yii::$app->request;

        $form = new LoginForm();
        $form->username = trim(mb_strtolower($request->getBodyParam('email'), 'UTF-8'));
        $form->password = $request->getBodyParam('password');

        if (!$form->login()) {
            throw new ForbiddenHttpException("Вы ввели неверный адрес электронной почты или пароль.");
        }
        return [
            'jwt' => $form->jwt,
        ];
    }

    /**
     * @OA\Get(
     *   tags={"User"},
     *   path="/v1/user/info",
     *   security={{"bearerAuth"={}}},
     *   summary="",
     *   @OA\Response(
     *     response=200,
     *     description=""
     *   )
     * )
     */
    public function actionInfo()
    {
        $user = $this->getUser();
        return [
            'user' => $user->toArray(['id', 'email', 'fio', 'role']),
        ];
    }
}