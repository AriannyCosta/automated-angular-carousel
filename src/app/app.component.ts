import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private _activeImageIndex: number = 0;
  timerSubscription!: Subscription;
  private interval = 2000;
  images: string[] = [
    'https://picsum.photos/id/145/2500/1667',
    'https://picsum.photos/id/128/2500/1667',
    'https://picsum.photos/id/137/2500/1667',
    'https://picsum.photos/id/550/2500/1667',
    'https://picsum.photos/id/15/2500/1667',
    'https://picsum.photos/id/185/2500/1667',
    'https://picsum.photos/id/190/2500/1667',
    'https://picsum.photos/id/95/2500/1667',
    'https://picsum.photos/id/352/2500/1667'
  ];

  get activeImageIndex(): number {
    return this._activeImageIndex;
  }

  set activeImageIndex(value: number) {
    this._activeImageIndex = (value + this.images.length) % this.images.length;
  }

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  startTimer(): void {
    this.stopTimer();
    this.timerSubscription = timer(this.interval, this.interval).subscribe(() => {
      this.nextImage();
    });
  }

  selectImage(index: number): void {
    this.activeImageIndex = index;
    this.startTimer();
  }

  stopTimer(): void {
    this.timerSubscription?.unsubscribe();
  }

  nextImage(event?: MouseEvent): void {
    event?.stopPropagation();
    this.activeImageIndex++;
  }

  previousImage(event?: MouseEvent): void {
    event?.stopPropagation();
    this.activeImageIndex--;
  }

  getImageUrl(): string {
    return `url(${this.images[this.activeImageIndex]})`;
  }
}