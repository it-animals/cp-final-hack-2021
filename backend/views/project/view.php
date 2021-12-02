<?php

use yii\helpers\Html;
use yii\widgets\DetailView;
use app\models\Project;

/* @var $this yii\web\View */
/* @var $model app\models\Project */
/* @var $statuses array */
/* @var $types array */
/* @var $transports array */
/* @var $certifications array */

$this->title = $model->name;
$this->params['breadcrumbs'][] = ['label' => 'Проекты', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
\yii\web\YiiAsset::register($this);
?>
<div class="project-view">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Изменить', ['update', 'id' => $model->id], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Удалить', ['delete', 'id' => $model->id], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => 'Вы уверены, что хотите удалить этот проект?',
                'method' => 'post',
            ],
        ]) ?>
    </p>

    <?= DetailView::widget([
        'model' => $model,
        'attributes' => [
            'id',
            'name',            
            [
                'attribute' => 'status',
                'value' => function(Project $model) use($statuses) {
                    return $statuses[$model->status];
                }
            ],
            [
                'attribute' => 'type',
                'value' => function(Project $model) use($types) {
                    return $types[$model->type];
                }
            ],
            [
                'attribute' => 'for_transport',
                'value' => function(Project $model) use($transports) {
                    return $transports[$model->for_transport];
                }
            ],        
            [
                'attribute' => 'certification',
                'value' => function(Project $model) use($certifications) {
                    return $certifications[$model->certification];
                }
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
            'descr:raw',
            'cases:raw',
            'profit:raw',
        ],
    ]) ?>

</div>
