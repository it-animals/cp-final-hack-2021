<?php

namespace app\modules\v1\controllers;

use app\models\Project;
use app\models\ProjectSearch;
use app\modules\v1\helpers\BehaviorHelper;
use app\modules\v1\traits\GetUserTrait;
use app\modules\v1\traits\OptionsActionTrait;
use yii\rest\Controller;
use yii\web\BadRequestHttpException;

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
            'POST' => [
                BehaviorHelper::AUTH_REQUIRED => ['create'],
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
     *     @OA\Examples(
     *       example="teams",
     *       value="teams",
     *       summary="teams",
     *     ),
     *     @OA\Examples(
     *       example="projectRequests",
     *       value="projectRequests",
     *       summary="projectRequests",
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
     *     name="ProjectSearch[search]",
     *     in="query",
     *     description="Поиск по всему",
     *     allowEmptyValue=true,
     *     @OA\Schema(
     *       type="string",
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
     *   @OA\Parameter(
     *     name="ProjectSearch[tags][]",
     *     in="query",
     *     description="Поиск по tags",
     *     allowEmptyValue=true,
     *     @OA\Schema(
     *       type="integer",
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

    /**
     * @OA\Post(
     *   tags={"Project"},
     *   path="/v1/project/create",
     *   security={{"bearerAuth"={}}},
     *   summary="",
     *   @OA\RequestBody(
     *     @OA\MediaType(
     *       mediaType="multipart/form-data",
     *       @OA\Schema(
     *         required={"name", "status", "type", "for_transport", "certification"},
     *         @OA\Property(
     *           property="name",
     *           type="string",
     *           description="",
     *         ),
     *         @OA\Property(
     *           property="status",
     *           type="integer",
     *           description="",
     *         ),
     *         @OA\Property(
     *           property="type",
     *           type="integer",
     *           description="",
     *         ),
     *         @OA\Property(
     *           property="for_transport",
     *           type="integer",
     *           description="",
     *         ),
     *         @OA\Property(
     *           property="certification",
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
    public function actionCreate()
    {
        $model = new Project();
        if ($model->load($this->request->post()) && $model->save()) {
            return [
                'project' => $model,
            ];
        }
        throw new BadRequestHttpException($model->errors ? $model->getErrorSummary(false)[0] : 'Ошибка загрузки формы');
    }
}