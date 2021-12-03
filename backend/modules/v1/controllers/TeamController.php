<?php

namespace app\modules\v1\controllers;

use app\models\Team;
use app\models\TeamSearch;
use app\modules\v1\helpers\BehaviorHelper;
use app\modules\v1\traits\GetUserTrait;
use app\modules\v1\traits\OptionsActionTrait;
use yii\rest\Controller;
use yii\web\BadRequestHttpException;

/**
 * @OA\Tag(
 *   name="Team"
 * )
 */
class TeamController extends Controller
{
    use OptionsActionTrait, GetUserTrait;

    public function behaviors()
    {
        return BehaviorHelper::api(parent::behaviors(), [
            'GET' => [
                BehaviorHelper::AUTH_REQUIRED => ['index'],
            ],
            'POST' => [
                BehaviorHelper::AUTH_REQUIRED => ['create'],
            ],
        ]);
    }

    /**
     * @OA\Get(
     *   tags={"Team"},
     *   path="/v1/team/index",
     *   security={{"bearerAuth"={}}},
     *   summary="",
     *   @OA\Response(
     *     response=200,
     *     description=""
     *   )
     * )
     */
    public function actionIndex()
    {
        $searchModel = new TeamSearch();
        $dataProvider = $searchModel->search($this->request->queryParams);
        return [
            'teams' => $dataProvider,
        ];
    }

    /**
     * @OA\Post(
     *   tags={"Team"},
     *   path="/v1/team/create",
     *   security={{"bearerAuth"={}}},
     *   summary="",
     *   @OA\Response(
     *     response=200,
     *     description=""
     *   )
     * )
     */
    public function actionCreate()
    {
        $model = new Team();
        $model->loadDefaultValues();
        if ($this->request->isPost) {
            if ($model->load($this->request->post()) && $model->save()) {
                return [
                    'team' => $model,
                ];
            }
        }
        throw new BadRequestHttpException("Bad Request");
    }
}