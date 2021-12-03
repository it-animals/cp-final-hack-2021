<?php

use yii\db\Migration;

/**
 * Class m211203_171033_add_project_id_to_request
 */
class m211203_171033_add_project_id_to_request extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('request', 'project_id',  $this->integer()->null());
        
        $this->addForeignKey('fk_request_project_id', 'request', 'project_id', 'project', 'id', 'CASCADE', 'CASCADE');
        $this->createIndex('idx_request_project_id', 'request', 'project_id');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('request', 'project_id');
    }    
}
