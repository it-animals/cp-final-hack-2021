<?php

declare(strict_types=1);

namespace app\services;

use app\models\User;
use app\models\UserIdentity;
use Exception;
use Firebase\JWT\JWT;
use yii\base\BaseObject;

final class JwtService extends BaseObject
{
    /**
     * @var string Алгоритм шифрования
     */
    private string $algo = '';

    /**
     * @var int Время жизни токена
     */
    private int $lifetime = 0;

    /**
     * @var string Ключ шифрования
     */
    private string $secret = '';

    public function __construct($config = [])
    {
        parent::__construct($config);
    }

    /**
     * @param string $algo
     */
    public function setAlgo(string $algo): void
    {
        $this->algo = $algo;
    }

    /**
     * @param int $lifetime
     */
    public function setLifetime(int $lifetime): void
    {
        $this->lifetime = $lifetime;
    }

    /**
     * @param string $secret
     */
    public function setSecret(string $secret): void
    {
        $this->secret = $secret;
    }

    /**
     * @param User $user
     * @param string $hostInfo
     * @return string
     */
    public function createJwt(User $user, string $hostInfo): string
    {
        $currentTime = time();
        $expire = $currentTime + $this->lifetime;
        $payload = [
            'iat' => $currentTime,
            'iss' => $hostInfo,
            'aud' => $hostInfo,
            'nbf' => $currentTime,
            'exp' => $expire,
            'data' => [
                'id' => $user->id,
                'email' => $user->email,
            ],
            'jti' => $user->id,
        ];
        return JWT::encode($payload, $this->secret, $this->algo);
    }

    /**
     * @param string $token
     * @return UserIdentity|null
     */
    public function identityByJwtToken(string $token): ?UserIdentity
    {
        try {
            $decoded = JWT::decode($token, $this->secret, [$this->algo]);
        } catch (Exception $e) {
            $decoded = null;
        }
        if ($decoded && $decoded->exp > time()) {
            return UserIdentity::findIdentity($decoded->jti);
        }
        return null;
    }
}
