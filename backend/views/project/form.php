<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;
use dosamigos\ckeditor\CKEditor;

/* @var $this yii\web\View */
/* @var $model app\models\Project */
/* @var $form yii\widgets\ActiveForm */
/* @var $statuses array */
/* @var $types array */
/* @var $transports array */
/* @var $certifications array */

$this->title = 'Создать проект';
$this->params['breadcrumbs'][] = ['label' => 'Проекты', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="project-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <div class="project-form">

        <?php $form = ActiveForm::begin(); ?>

        <?= $form->field($model, 'name')->textInput(['maxlength' => true]) ?>

        <?= $form->field($model, 'status')->dropDownList($statuses) ?>

        <?= $form->field($model, 'type')->dropDownList($types) ?>

        <?= $form->field($model, 'for_transport')->dropDownList($transports) ?>

        <?= $form->field($model, 'certification')->dropDownList($certifications) ?>
        
        <?= $form->field($model, 'tagsRaw')->textarea(['rows' => 3]) ?>

        <?= $form->field($model, 'cases')->widget(CKeditor::class, [
            'options' => ['rows' => 6],
            'preset' => 'basic'
        ]) ?>

        <?= $form->field($model, 'profit')->widget(CKeditor::class, [
            'options' => ['rows' => 6],
            'preset' => 'basic'
        ]) ?>
        
        <?= $form->field($model, 'descr')->widget(CKeditor::class, [
            'options' => ['rows' => 12],
            'preset' => 'full'
        ]) ?>

        <div class="form-group">
            <?= Html::submitButton('Сохранить', ['class' => 'btn btn-success']) ?>
        </div>

        <?php ActiveForm::end(); ?>

    </div>


</div>
