<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\ProjectFile */
/* @var $form yii\widgets\ActiveForm */

$this->title = $model->isNewRecord ? 'Прикрепить файл' : 'Заменить файл';
$this->params['breadcrumbs'][] = ['label' => 'Стартапы', 'url' => ['project/index']];
$this->params['breadcrumbs'][] = ['label' => $model->project->name, 'url' => ['project/view', 'id' => $model->project_id]];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="project-file-create">

    <h1><?= Html::encode($this->title) ?></h1>    

    <div class="project-file-form">

        <?php $form = ActiveForm::begin(['options' => ['enctype' => 'multipart/form-data']]); ?>

        <?= $form->field($model, 'file')->fileInput(['accept' => ".docx, .doc, .xlsx, .xls, .odt, .ods"]) ?>    

        <div class="form-group">
            <?= Html::submitButton('Загрузить', ['class' => 'btn btn-success']) ?>
        </div>

        <?php ActiveForm::end(); ?>

    </div>


</div>
