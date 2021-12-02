<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%request_tag}}`.
 */
class m211202_182604_create_request_tag_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%request_tag}}', [
            'id' => $this->primaryKey(),
            'request_id' => $this->integer()->notNull(),
            'tag_id' => $this->integer()->notNull(),
        ]);
        
        $this->addForeignKey('fk_request_tag_request_id', 'request_tag', 'request_id', 'request', 'id', 'CASCADE', 'CASCADE');
        $this->createIndex('idx_request_tag_request_id', 'request_tag', 'request_id');
        
        $this->addForeignKey('fk_request_tag_tag_id', 'request_tag', 'tag_id', 'tag', 'id', 'CASCADE', 'CASCADE');
        $this->createIndex('idx_request_tag_tag_id', 'request_tag', 'tag_id');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%request_tag}}');
    }
}
