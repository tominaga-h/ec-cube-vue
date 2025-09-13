<?php

namespace Customize\Controller;

use Rompetomp\InertiaBundle\Architecture\InertiaInterface;
use Eccube\Controller\AbstractController as BaseController;

abstract class AbstractController extends BaseController
{
    protected InertiaInterface $inertia;

    public function __construct(InertiaInterface $inertia)
    {
        $this->setInertia($inertia);
    }

    public function setInertia(InertiaInterface $inertia): void
    {
        $this->inertia = $inertia;
    }
}
