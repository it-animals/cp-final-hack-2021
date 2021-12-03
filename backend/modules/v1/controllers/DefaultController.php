<?php

namespace app\modules\v1\controllers;

use Yii;
use yii\web\Controller;
use yii\web\Response;

/**
 * @OA\Info(
 *   title="INNO TECH",
 *   version="1.0.0",
 *   @OA\Contact(
 *     email="support@example.com"
 *   ),
 *   @OA\SecurityScheme(
 *     securityScheme="bearerAuth",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="JWT",
 *   ),
 *   @OA\Server(
 *     url="/",
 *     description="default"
 *   ),
 * ),
 */
class DefaultController extends Controller
{
    public function actionIndex(): Response
    {
        return $this->asJson(['api' => 'v1']);
    }

    public function actionError(): Response
    {
        $exception = Yii::$app->errorHandler->exception;
        if ($exception !== null) {
            $statusCode = $exception->statusCode;
            $name = $exception->getName();
            $message = $exception->getMessage();

            return $this->asJson([
                'status' => $statusCode,
                'name' => $name,
                'message' => $message
            ]);
        }

        return $this->asJson([
            'status' => Yii::$app->response->statusCode,
        ]);
    }
}
