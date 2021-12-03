<?php

use yii\helpers\Html;
use yii\grid\GridView;
use yii\widgets\Pjax;
use app\models\Request;
/* @var $this yii\web\View */
/* @var $searchModel app\models\RequestSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Запросы';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="request-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Добавить', ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?php Pjax::begin(); ?>    

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            'id',            
            [
                'attribute' => 'name',
                'value' => function(Request $model) {
                    return Html::a($model->name, ['view', 'id' => $model->id], ['data-pjax' => 0]);
                },
                'format' => 'raw',
            ],
            [
                'attribute' => 'user_id',
                'value' => function(Request $model) {
                    return $model->user->fio;
                }
            ],
            [
                'attribute' => 'project_id',
                'value' => function(Request $model) {
                    return $model->project ? $model->project->name : 'не выбран';
                }
            ],
        ],
    ]); ?>

    <?php Pjax::end(); ?>

</div>
