<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class AISPController extends Controller
{
    /**
     * @Route("/aisp", name="aisp")
     */
    public function aispAction()
    {
        return $this->render('default/index.html.twig');

    }
}
