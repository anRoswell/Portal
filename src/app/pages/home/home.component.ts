import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  logo: string = 'assets/img/logoubs.png';
  logoColor: string = 'assets/img/topo_logo.png';

  itemsPerSlide = 4;
  singleSlideOffset = false;
  noWrap = false;

  slidesChangeMessage = '';

  slides = [
    {
      image:
        'https://urbaser.co/wp-content/uploads/2022/01/WhatsApp-Image-2021-07-18-at-6.47.29-AM.jpeg',
    },
    {
      image:
        'https://urbaser.co/wp-content/uploads/2022/01/WhatsApp-Image-2022-01-29-at-9.20.09-AM.jpeg',
    },
    {
      image:
        'https://urbaser.co/wp-content/uploads/2022/01/7251d9e5-44db-4cc5-92d8-bcf29ee1bd32.jpg',
    },
    { image: 'https://urbaser.co/wp-content/uploads/2021/11/P1140442.jpg' },
    {
      image:
        'https://urbaser.co/wp-content/uploads/2021/08/LOGO-HORIZONTAL.png',
    },
    {
      image:
        'https://urbaser.co/wp-content/uploads/2021/07/WhatsApp-Image-2021-07-07-at-12.28.52-PM.jpeg',
    },
    {
      image:
        'https://urbaser.co/wp-content/uploads/2021/04/20210421-nueva-sede1.jpg',
    },
    {
      image:
        'https://urbaser.co/wp-content/uploads/2021/04/20210413-compromiso1.jpg',
    },
    {
      image:
        'https://urbaser.co/wp-content/uploads/2021/03/20210304-andesco3.jpg',
    },
    {
      image:
        'https://urbaser.co/wp-content/uploads/2021/02/20210217-puntos_criticos1.jpg',
    },
    {
      image:
        'https://urbaser.co/wp-content/uploads/2022/01/WhatsApp-Image-2021-07-18-at-6.47.29-AM.jpeg',
    },
    {
      image:
        'https://urbaser.co/wp-content/uploads/2022/01/WhatsApp-Image-2022-01-29-at-9.20.09-AM.jpeg',
    },
  ];
  /**
   *
   */
  constructor(private router:Router) {
    
    
  }

  ngOnInit() {}

  onSlideRangeChange(indexes: number[] | void): void {
    this.slidesChangeMessage = `Slides have been switched: ${indexes}`;
  }

  nagvegar(ruta:string){
this.router.navigate([ruta])
  }
}
