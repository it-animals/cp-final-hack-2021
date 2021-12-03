<?php

namespace app\modules\v1\controllers;

use app\models\ProjectSearch;
use app\modules\v1\helpers\BehaviorHelper;
use app\modules\v1\traits\GetUserTrait;
use app\modules\v1\traits\OptionsActionTrait;
use yii\rest\Controller;

/**
 * @OA\Tag(
 *   name="Project"
 * )
 */
class ProjectController extends Controller
{
    use OptionsActionTrait, GetUserTrait;

    public function behaviors()
    {
        return BehaviorHelper::api(parent::behaviors(), [
            'GET' => [
                BehaviorHelper::AUTH_REQUIRED => ['index'],
            ],
        ]);
    }

    /**
     * @OA\Get(
     *   tags={"Project"},
     *   path="/v1/project/index",
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
        $searchModel = new ProjectSearch();
        $dataProvider = $searchModel->search($this->request->queryParams);
        return [
            'projects' => $dataProvider,
        ];
    }
}