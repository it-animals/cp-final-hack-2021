<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%team}}`.
 */
class m211202_135324_create_team_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%team}}', [
            'id' => $this->primaryKey(),
            'project_id' => $this->integer()->notNull(),
            'user_id' => $this->integer()->notNull(),
            'is_owner' => $this->boolean()->notNull(),
        ]);

        $this->addForeignKey('fk_team_project_id', 'team', 'project_id', 'project', 'id', 'CASCADE', 'CASCADE');
        $this->createIndex('idx_team_project_id', 'team', 'project_id');

        $this->addForeignKey('fk_team_user_id', 'team', 'user_id', 'user', 'id', 'CASCADE', 'CASCADE');
        $this->createIndex('idx_team_user_id', 'team', 'user_id');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%team}}');
    }
}
