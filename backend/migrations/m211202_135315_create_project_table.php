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
            'name' => $this->string(1000)->unique()->notNull(),
            'descr' => $this->text()->notNull(),
            'tags' => $this->json()->null(),
            'status' => $this->smallInteger()->notNull(),
            'type' => $this->smallInteger()->notNull(),
            'for_transport' => $this->smallInteger()->notNull(),
            'certification' => $this->smallInteger()->notNull(),
            'budget' => $this->decimal(10, 0)->notNull(),
            'date_start' => $this->date()->notNull(),
            'date_end' => $this->date()->notNull(),
            'mark_ready' => $this->float()->null(),
            'mark_idea' => $this->float()->null(),
            'mark_finance' => $this->float()->null(),
            'mark_pilot' => $this->float()->null(),
            'mark_success' => $this->smallInteger(3)->null(),
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
