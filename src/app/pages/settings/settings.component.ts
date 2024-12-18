import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {



  userSettings: any = {
    username: '',
    email: '',
    password: '',
    notifications: false
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadUserSettings();
  }

  // دالة لتحميل الإعدادات من API DummyJSON
  loadUserSettings() {
    this.http.get('https://dummyjson.com/users/1') // فرضًا أننا نستخدم المستخدم الأول
      .subscribe((response: any) => {
        this.userSettings = {
          username: response.username,
          email: response.email,
          password: '',
          notifications: response.notifications || false
        };
      });
  }

  // دالة لحفظ الإعدادات
  saveSettings() {
    this.http.put('https://dummyjson.com/users/1', this.userSettings)
      .subscribe(response => {
        console.log('Settings updated:', response);
        alert('Settings saved successfully!');
      }, error => {
        console.error('Error saving settings:', error);
        alert('Error saving settings');
      });
  }



}
