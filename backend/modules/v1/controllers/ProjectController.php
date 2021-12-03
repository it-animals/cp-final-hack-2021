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
     *   @OA\Parameter(
     *     name="expand",
     *     in="query",
     *     description="Список доп. полей, можно перечислить через ','",
     *     @OA\Schema(
     *       type="string",
     *     ),
     *     @OA\Examples(
     *       example="",
     *       value="",
     *       summary="",
     *     ),
     *     @OA\Examples(
     *       example="tags",
     *       value="tags",
     *       summary="tags",
     *     ),
     *     @OA\Examples(
     *       example="projectFiles",
     *       value="projectFiles",
     *       summary="projectFiles",
     *     ),
     *   ),
     *   @OA\Parameter(
     *     name="sort",
     *     in="query",
     *     description="Сортировка",
     *     @OA\Schema(
     *       type="string",
     *     ),
     *     @OA\Examples(
     *       example="",
     *       value="",
     *       summary="",
     *     ),
     *     @OA\Examples(
     *       example="id",
     *       value="id",
     *       summary="id asc",
     *     ),
     *     @OA\Examples(
     *       example="-id",
     *       value="-id",
     *       summary="id desc",
     *     ),
     *   ),
     *   @OA\Parameter(
     *     name="ProjectSearch[id]",
     *     in="query",
     *     description="Поиск по id",
     *     allowEmptyValue=true,
     *     @OA\Schema(
     *       type="integer",
     *     ),
     *   ),
     *   @OA\Parameter(
     *     name="ProjectSearch[status]",
     *     in="query",
     *     description="Поиск по status",
     *     allowEmptyValue=true,
     *     @OA\Schema(
     *       type="integer",
     *     ),
     *   ),
     *   @OA\Parameter(
     *     name="ProjectSearch[type]",
     *     in="query",
     *     description="Поиск по type",
     *     allowEmptyValue=true,
     *     @OA\Schema(
     *       type="integer",
     *     ),
     *   ),
     *   @OA\Parameter(
     *     name="ProjectSearch[for_transport]",
     *     in="query",
     *     description="Поиск по for_transport",
     *     allowEmptyValue=true,
     *     @OA\Schema(
     *       type="integer",
     *     ),
     *   ),
     *   @OA\Parameter(
     *     name="ProjectSearch[certification]",
     *     in="query",
     *     description="Поиск по certification",
     *     allowEmptyValue=true,
     *     @OA\Schema(
     *       type="integer",
     *     ),
     *   ),
     *   @OA\Parameter(
     *     name="ProjectSearch[name]",
     *     in="query",
     *     description="Поиск по name",
     *     allowEmptyValue=true,
     *     @OA\Schema(
     *       type="string",
     *     ),
     *   ),
     *   @OA\Parameter(
     *     name="ProjectSearch[descr]",
     *     in="query",
     *     description="Поиск по descr",
     *     allowEmptyValue=true,
     *     @OA\Schema(
     *       type="string",
     *     ),
     *   ),
     *   @OA\Parameter(
     *     name="ProjectSearch[cases]",
     *     in="query",
     *     description="Поиск по cases",
     *     allowEmptyValue=true,
     *     @OA\Schema(
     *       type="string",
     *     ),
     *   ),
     *   @OA\Parameter(
     *     name="ProjectSearch[profit]",
     *     in="query",
     *     description="Поиск по profit",
     *     allowEmptyValue=true,
     *     @OA\Schema(
     *       type="string",
     *     ),
     *   ),
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