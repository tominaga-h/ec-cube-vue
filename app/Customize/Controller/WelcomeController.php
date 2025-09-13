<?php

namespace Customize\Controller;

use Customize\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class WelcomeController extends AbstractController
{
    /**
     * @Route("/welcome", name="welcome", methods={"GET"})
     */
    public function index()
    {
        $this->inertia->setRootView('welcome.twig');
        return $this->inertia->render('welcome', [
            'name' => 'Hayato Tominaga',
        ]);
    }
}
