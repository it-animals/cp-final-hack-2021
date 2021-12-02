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
            'prof' => $this->string(200)->null(),
            'phone' => $this->string(11)->null(),
            'firm_name' => $this->string(100)->null(),
            'firm_inn' => $this->string(10)->null(),
            'firm_size' => $this->smallInteger()->null(),
            'contacts' => $this->string(100),
            'avatar' => $this->text()->null(),
            'role' => $this->smallInteger()->notNull(),
            'password' => $this->string(1000),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%user}}');
    }
}
