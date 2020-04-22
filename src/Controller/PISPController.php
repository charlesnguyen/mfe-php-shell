<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class PISPController extends Controller
{
    /**
     * @Route("/pisp", name="pisp")
     */
    public function pispAction()
    {
        return $this->render('default/index.html.twig');

    }
}
