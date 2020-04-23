<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    /**
     * @Route("/apps/{aispRouting}", requirements={"aispRouting"=".+"})
     * @Route("/", name="default")
     */
    public function indexAction()
    {
        $token = "charles_token";
        return $this->render('default/index.html.twig',['token' => $token]);

    }
}
