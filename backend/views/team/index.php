<?php

use yii\helpers\Html;
use yii\grid\GridView;
use yii\widgets\Pjax;
use app\models\Team;
/* @var $this yii\web\View */
/* @var $searchModel app\models\TeamSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */
/* @var $users array */
?>
<div class="team-index">

    <h1><?= Html::encode('Команда') ?></h1>

    <p>
        <?= Html::a('Добавить', ['/team/create', 'projectId' => $searchModel->project_id], ['class' => 'btn btn-success']) ?>
    </p>

    <?php Pjax::begin(); ?>    

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],
            [
                'attribute' => 'user_id',
                'value' => function(Team $model) {
                    return "{$model->user->fio} ({$model->user->email})";
                },
                'filter' => $users
            ],
            'is_owner:boolean',

            [
                'class' => 'yii\grid\ActionColumn',
                'template' => '{update} {delete}',
                'controller' => 'team'
            ],
        ],
    ]); ?>

    <?php Pjax::end(); ?>

</div>
