<?php

namespace app\commands;

use app\models\User;
use Yii;
use yii\console\Controller;
use yii\console\ExitCode;
use function var_dump;

class ToolController extends Controller
{
    public function actionCreateAdmin(string $email, string $password)
    {
        $user = new User();
        $user->fio = $email;
        $user->email = $email;
        $user->password = Yii::$app->security->generatePasswordHash($password);
        $user->role = 1;
        $user->save();

        return ExitCode::OK;
    }
}