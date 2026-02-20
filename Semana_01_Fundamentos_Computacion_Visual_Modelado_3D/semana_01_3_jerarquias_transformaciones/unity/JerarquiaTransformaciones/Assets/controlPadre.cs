using UnityEngine;
using UnityEngine.UI;
using TMPro;
using UnityEngine.InputSystem;

public class ControladorPadre : MonoBehaviour
{
    public Transform padre;

    public Slider sliderX;
    public Slider sliderY;
    public Slider sliderZ;

    public TMP_Text textoInfo;

    void Update()
    {
        padre.position = new Vector3(sliderX.value, sliderY.value, sliderZ.value);

        if (Keyboard.current.qKey.isPressed)
            padre.Rotate(0, -50 * Time.deltaTime, 0);
        if (Keyboard.current.eKey.isPressed)
            padre.Rotate(0, 50 * Time.deltaTime, 0);

        Transform hijo = padre.GetChild(0);
        Transform nieto = hijo.GetChild(0);

        textoInfo.text =
            $"PADRE\n" +
            $"Pos: {padre.position}\n" +
            $"Rot: {padre.eulerAngles}\n\n" +
            $"HIJO Pos: {hijo.position}\n" +
            $"NIETO Pos: {nieto.position}";
    }
}