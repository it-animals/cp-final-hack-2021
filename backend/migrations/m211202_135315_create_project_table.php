<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%project}}`.
 */
class m211202_135315_create_project_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%project}}', [
            'id' => $this->primaryKey(),
            'name' => $this->string(200)->unique()->notNull(),
            'descr' => $this->text()->null(),
            'cases' => $this->text()->null(),
            'profit' => $this->text()->null(),
            'status' => $this->smallInteger()->notNull(),
            'type' => $this->smallInteger()->notNull(),
            'for_transport' => $this->smallInteger()->notNull(),
            'certification' => $this->smallInteger()->notNull(),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%project}}');
    }
}
