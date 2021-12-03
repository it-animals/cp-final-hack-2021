<?php
use yii\helpers\Html;

/* @var $this yii\web\View */

$this->title = 'Витрина стартапов';
?>
<div class="site-index">

    <div class="jumbotron text-center bg-transparent">
        <h1 class="display-4"><?= $this->title ?></h1>

    </div>

    <div class="body-content">

        <div class="row">
            <div class="col-lg-4">
                <h2>Стартапы</h2>

                <?= Html::a('Стартапы', ['project/index']) ?><br>  
                <?= Html::a('Запросы', ['request/index']) ?><br>  
            </div>
            <div class="col-lg-4">
                <h2>Справочники</h2>

                <?= Html::a('Теги', ['tag/index']) ?><br>  
            </div>
            <div class="col-lg-4">
                <h2>Пользователи</h2>

                <?= Html::a('Пользователи', ['user/index']) ?><br>  
            </div>
        </div>

    </div>
</div>
