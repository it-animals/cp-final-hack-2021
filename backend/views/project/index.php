<?php

use yii\helpers\Html;
use yii\grid\GridView;
use yii\widgets\Pjax;
use app\models\Project;
/* @var $this yii\web\View */
/* @var $searchModel app\models\ProjectSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */
/* @var $statuses array */
/* @var $types array */
/* @var $transports array */
/* @var $certifications array */

$this->title = 'Проекты';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="project-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Создать', ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?php Pjax::begin(); ?>    

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            'id',
            [
                'attribute' => 'name',
                'value' => function(Project $model) {
                    return Html::a($model->name, ['view', 'id' => $model->id], ['data-pjax' => 0]);
                },
                'format' => 'raw',
            ],
            [
                'attribute' => 'status',
                'value' => function(Project $model) use($statuses) {
                    return $statuses[$model->status];
                },
                'filter' => $statuses
            ],
            [
                'attribute' => 'type',
                'value' => function(Project $model) use($types) {
                    return $types[$model->type];
                },
                'filter' => $types
            ],
            [
                'attribute' => 'for_transport',
                'value' => function(Project $model) use($transports) {
                    return $transports[$model->for_transport];
                },
                'filter' => $transports,
            ],        
            [
                'attribute' => 'certification',
                'value' => function(Project $model) use($certifications) {
                    return $certifications[$model->certification];
                },
                'filter' => $certifications
            ],
            [
                'label' => 'Теги',
                'value' => function(Project $model)  {
                    $list = [];
                    foreach($model->tags as $tag) {
                        $list[] = $tag->name;
                    }
                    return implode(' ', $list);
                },
            ],
        ],
    ]); ?>

    <?php Pjax::end(); ?>

</div>
