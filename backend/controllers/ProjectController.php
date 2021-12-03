<?php

namespace app\controllers;

use app\models\Project;
use app\models\ProjectSearch;
use app\models\ProjectFileSearch;
use app\models\TeamSearch;
use app\models\User;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;
use app\models\ProjectTag;
use yii\filters\AccessControl;

/**
 * ProjectController implements the CRUD actions for Project model.
 */
class ProjectController extends Controller
{
    /**
     * @inheritDoc
     */
    public function behaviors()
    {
        return array_merge(
            parent::behaviors(),
            [
                'verbs' => [
                    'class' => VerbFilter::class,
                    'actions' => [
                        'delete' => ['POST'],
                    ],
                ],
                'accesses' => [
                    'class' => AccessControl::class,
                    'rules' => [
                        [
                            'allow' => true,                            
                            'roles' => ['@'],
                        ],
                    ],
                ],
            ]
        );
    }

    /**
     * Lists all Project models.
     * @return mixed
     */
    public function actionIndex()
    {
        $searchModel = new ProjectSearch();
        $dataProvider = $searchModel->search($this->request->queryParams);

        return $this->render('index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
            'statuses' => Project::getStatusList(),
            'types' => Project::getTypeList(),
            'transports' => Project::getTransportList(),
            'certifications' => Project::getCertificationList(),
        ]);
    }

    /**
     * Displays a single Project model.
     * @param int $id Код
     * @return mixed
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionView($id)
    {
        $model = $this->findModel($id);
        $projectFileContent = $this->renderProjectFileIndex($model);
        $teamContent = $this->renderTeamIndex($model);
        return $this->render('view', [
            'model' => $model,
            'statuses' => Project::getStatusList(),
            'types' => Project::getTypeList(),
            'transports' => Project::getTransportList(),
            'certifications' => Project::getCertificationList(),
            'projectFileContent' => $projectFileContent,
            'teamContent' => $teamContent,
        ]);
    }
    
    private function renderProjectFileIndex(Project $project) {
        $searchModel = new ProjectFileSearch();
        $searchModel->project_id = $project->id;
        $dataProvider = $searchModel->search($this->request->queryParams);

        return $this->renderPartial('/project-file/index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
        ]);
    }
    
    private function renderTeamIndex(Project $project) {
        $searchModel = new TeamSearch();
        $searchModel->project_id = $project->id;
        $dataProvider = $searchModel->search($this->request->queryParams);
        return $this->renderPartial('/team/index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
            'users' => User::getList(),
        ]);
    }

    /**
     * Creates a new Project model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return mixed
     */
    public function actionCreate()
    {
        $model = new Project();

        if ($this->request->isPost) {
            if ($model->load($this->request->post()) && $model->save()) {
                return $this->redirect(['view', 'id' => $model->id]);
            }
        } else {
            $model->loadDefaultValues();
        }

        return $this->render('form', [
            'model' => $model,
            'statuses' => Project::getStatusList(),
            'types' => Project::getTypeList(),
            'transports' => Project::getTransportList(),
            'certifications' => Project::getCertificationList(),
        ]);
    }

    /**
     * Updates an existing Project model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param int $id Код
     * @return mixed
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionUpdate($id)
    {
        $model = $this->findModel($id);
        $tags = [];
        foreach($model->tags as $tag) {
            $tags[] = $tag->name;
        }
        $model->tagsRaw = implode(' ', $tags);

        if ($this->request->isPost && $model->load($this->request->post()) && $model->save()) {
            return $this->redirect(['view', 'id' => $model->id]);
        }

        return $this->render('form', [
            'model' => $model,
            'statuses' => Project::getStatusList(),
            'types' => Project::getTypeList(),
            'transports' => Project::getTransportList(),
            'certifications' => Project::getCertificationList(),
        ]);
    }
    
    public function actionGenerate($id) {
        $model = $this->findModel($id);
        $generator = new \app\generators\TagGenerator($model->profit);
        $tags1 = $generator->generate();
        
        $generator = new \app\generators\TagGenerator($model->cases);
        $tags2 = $generator->generate();
        $tags = array_merge($tags1, $tags2);
        if($tags) {
            ProjectTag::deleteAllByProject($model);
            foreach($tags as $tag) {
                $ptag = ProjectTag::addToProject($model, $tag);
            }
        }        
        return $this->redirect(['view', 'id' => $model->id]);
    }

    /**
     * Deletes an existing Project model.
     * If deletion is successful, the browser will be redirected to the 'index' page.
     * @param int $id Код
     * @return mixed
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionDelete($id)
    {
        $this->findModel($id)->delete();

        return $this->redirect(['index']);
    }

    /**
     * Finds the Project model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param int $id Код
     * @return Project the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($id)
    {
        if (($model = Project::findOne($id)) !== null) {
            return $model;
        }

        throw new NotFoundHttpException('Такого проекта не существует');
    }
}
