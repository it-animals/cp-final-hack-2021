<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%request}}`.
 */
class m211202_182557_create_request_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%request}}', [
            'id' => $this->primaryKey(),
            'user_id' => $this->integer()->notNull(),
            'name' => $this->string(200)->notNull(),
            'descr' => $this->text()->null(),
        ]);
        
        $this->addForeignKey('fk_request_user_id', 'request', 'user_id', 'user', 'id', 'CASCADE', 'CASCADE');
        $this->createIndex('idx_request_user_id', 'request', 'user_id');
        
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%request}}');
    }
}
