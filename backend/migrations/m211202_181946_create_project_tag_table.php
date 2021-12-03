<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%project_tag}}`.
 */
class m211202_181946_create_project_tag_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%project_tag}}', [
            'id' => $this->primaryKey(),
            'project_id' => $this->integer()->notNull(),
            'tag_id' => $this->integer()->notNull(),
        ]);
        
        $this->addForeignKey('fk_project_tag_project_id', 'project_tag', 'project_id', 'project', 'id', 'CASCADE', 'CASCADE');
        $this->createIndex('idx_project_tag_project_id', 'project_tag', 'project_id');
        
        $this->addForeignKey('fk_project_tag_tag_id', 'project_tag', 'tag_id', 'tag', 'id', 'CASCADE', 'CASCADE');
        $this->createIndex('idx_project_tag_tag_id', 'project_tag', 'tag_id');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%project_tag}}');
    }
}
