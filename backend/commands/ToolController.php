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

        /**
         *         11. role — smallint not null:
        1. администратор;
        2. внутренний эксперт;
        3. внешний эксперт;
        4. представитель московского транспорта;
        5. участник;
         */

        return ExitCode::OK;
    }
}