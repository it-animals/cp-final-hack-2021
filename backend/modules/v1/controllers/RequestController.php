<?php

namespace app\modules\v1\controllers;

use app\models\Request;
use app\models\RequestSearch;
use app\modules\v1\helpers\BehaviorHelper;
use app\modules\v1\traits\GetUserTrait;
use app\modules\v1\traits\OptionsActionTrait;
use yii\rest\Controller;
use yii\web\BadRequestHttpException;

/**
 * @OA\Tag(
 *   name="Request"
 * )
 */
class RequestController extends Controller
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
     *   tags={"Request"},
     *   path="/v1/request/index",
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
        $searchModel = new RequestSearch();
        $dataProvider = $searchModel->search($this->request->queryParams);
        return [
            'requests' => $dataProvider,
        ];
    }

    /**
     * @OA\Post(
     *   tags={"Request"},
     *   path="/v1/request/create",
     *   security={{"bearerAuth"={}}},
     *   summary="",
     *   @OA\RequestBody(
     *     @OA\MediaType(
     *       mediaType="multipart/form-data",
     *       @OA\Schema(
     *         required={"name"},
     *         @OA\Property(
     *           property="name",
     *           type="string",
     *           description="",
     *         ),
     *         @OA\Property(
     *           property="descr",
     *           type="string",
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
        $user = $this->getUser();

        $request = new Request();
        $request->user_id = $user->id;
        $request->name = $this->request->getBodyParam('name');
        $request->descr = $this->request->getBodyParam('descr');

        if (!$request->save()) {
            throw new BadRequestHttpException($request->getErrorSummary(false)[0]);
        }
        return [
            'request' => $request,
        ];
    }
}