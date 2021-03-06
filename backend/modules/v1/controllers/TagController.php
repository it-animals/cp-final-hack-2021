<?php

namespace app\modules\v1\controllers;

use app\models\Tag;
use app\models\TagSearch;
use app\modules\v1\helpers\BehaviorHelper;
use app\modules\v1\traits\GetUserTrait;
use app\modules\v1\traits\OptionsActionTrait;
use yii\rest\Controller;
use yii\web\BadRequestHttpException;

/**
 * @OA\Tag(
 *   name="Tag"
 * )
 */
class TagController extends Controller
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
     *   tags={"Tag"},
     *   path="/v1/tag/index",
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
        $searchModel = new TagSearch();
        $dataProvider = $searchModel->search($this->request->queryParams);
        return [
            'tags' => $dataProvider,
        ];
    }

    /**
     * @OA\Post(
     *   tags={"Tag"},
     *   path="/v1/tag/create",
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
        $model = new Tag();
        $model->loadDefaultValues();
        if ($this->request->isPost) {
            if ($model->load($this->request->post()) && $model->save()) {
                return [
                    'tag' => $model
                ];
            }
        }
        throw new BadRequestHttpException("Bad Request");
    }
}