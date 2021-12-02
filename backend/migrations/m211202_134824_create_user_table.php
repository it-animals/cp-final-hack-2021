<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%user}}`.
 */
class m211202_134824_create_user_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%user}}', [
            'id' => $this->primaryKey(),
            'email' => $this->string(1000)->unique()->notNull(),
            'fio' => $this->string(100)->notNull(),
            'avatar' => $this->text()->null(),
            'role' => $this->smallInteger()->notNull(),
            'password' => $this->string(1000),
        ]);
        
        $this->createIndex('idx_user_email', 'user', 'email');
        $this->createIndex('idx_user_fio', 'user', 'fio');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%user}}');
    }
}
