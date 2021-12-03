<?php

use yii\helpers\Html;
use yii\grid\GridView;
use yii\widgets\Pjax;
use app\models\ProjectFile;
/* @var $this yii\web\View */
/* @var $searchModel app\models\ProjectFileSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

?>
<div class="project-file-index">

    <h2><?= Html::encode('Файлы') ?></h2>

    <p>
        <?= Html::a('Добавить', ['project-file/create', 'projectId' => $searchModel->project_id], ['class' => 'btn btn-success']) ?>
    </p>

    <?php Pjax::begin(); ?>    

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],
            [
                'attribute' => 'name',
                'value' => function(ProjectFile $model) {
                    return Html::a($model->name.'.'.$model->extension, ['project-file/view', 'id' => $model->id], ['data-pjax' => 0]);
                },
                'format' => 'raw',
            ],
            'content:ntext',

            [
                'class' => 'yii\grid\ActionColumn',
                'controller' => 'project-file'
            ],
        ],
    ]); ?>

    <?php Pjax::end(); ?>

</div>
