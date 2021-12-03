<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%project_file}}`.
 */
class m211202_135354_create_project_file_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%project_file}}', [
            'id' => $this->primaryKey(),
            'project_id' => $this->integer()->notNull(),
            'name' => $this->string(1000)->null(),
            'extension' => $this->string(1000)->null(),
            'content' => $this->text()->null(),
        ]);

        $this->addForeignKey('fk_project_file_project_id', 'project_file', 'project_id', 'project', 'id', 'CASCADE', 'CASCADE');
        $this->createIndex('idx_project_file_project_id', 'project_file', 'project_id');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%project_file}}');
    }
}
